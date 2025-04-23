import useItems from '@/composables/useItems';
import { defineComponent, h, type PropType, type Slot, type VNode } from "vue";

interface FancyItemListProps<T> {
  apiUrl: string;
  limit: number;
  limitKey?: string;
  dataKey?: string;
  itemKey?: string | ((item: T) => string | number);
  storeKey?: string;
}

export default <T> () => defineComponent<FancyItemListProps<T>>({
    name: "FancyItemList",
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      limit: {
        type: Number,
        default: 5
      },
      limitKey: {
        type: String,
        default: 'limit'
      },
      dataKey: {
        type: String,
        default: undefined
      },
      itemKey: {
        type: [String, Function] as PropType<string | ((item: T) => string | number)>,
        default: 'id'
      },
      storeKey: {
        type: String,
        default: undefined
      }
    },
    
    setup(props, { slots }: { slots: { 
      skeleton?: Slot; 
      error?: Slot; 
      empty?: Slot; 
      item?: Slot<T>; // Updated to match the slot props pattern
    } }) {
      // Function to get unique key for item
      const getItemKey = (item: T): string | number => {
        if (typeof props.itemKey === 'function') {
          return props.itemKey(item);
        }
        
        return typeof props.itemKey === 'string' && props.itemKey in (item as object)
          ? String(item[props.itemKey as keyof T]) 
          : JSON.stringify(item);
      };
      
      // Use the composable to fetch items
      const { items, error } = useItems<T>(
        props.apiUrl, 
        props.limit, 
        props.dataKey, 
        props.storeKey, 
        props.limitKey
      );
      
      return () => {
        // Generate list items based on state
        const listItems: VNode[] = [];
        
        // Loading state - show skeletons
        if (!error.value && !items.value) {
          for (let i = 0; i < props.limit; i++) {
            if (slots.skeleton) {
              listItems.push(h('li', { key: `skeleton-${i}` }, slots.skeleton()));
            }
          }
        }
        
        // Error state
        if (error.value && slots.error) {
          listItems.push(h('li', { key: 'error' }, slots.error()));
        }
        
        // Empty state
        else if (!error.value && items.value && items.value.length === 0 && slots.empty) {
          listItems.push(h('li', { key: 'empty' }, slots.empty()));
        }
        
        // Items loaded
        if (!error.value && items.value && items.value.length > 0 && slots.item) {
          items.value.forEach((item) => {
            listItems.push(
              h('li', { key: getItemKey(item) }, slots.item ? slots.item(item) : undefined)
            );
          });
        }
        
        // Return the unordered list with generated items
        return h('ul', { class: 'mt-4 flex flex-col gap-2' }, listItems);
      };
    }
  });
