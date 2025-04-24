import { useItemInfo } from "@/composables/useItemInfo";
import { defineComponent, h, type PropType, type Slot } from "vue";

export interface FancyItemInfoBindedProps<T> {
    loading: boolean;
    data?: T;
}

export function createFancyItemInfo<T>() {
  return defineComponent({
    name: "FancyItemInfo",
    props: {
      itemKey: {
        type: String as PropType<string>,
        required: true
      }
    },
    
    setup(props, { slots }: { slots: { 
      info?: Slot<{ loading: boolean; data: T | undefined }>;
    } }) {
      const { item, loading } = useItemInfo<T>(props.itemKey);
      
      return () => {
        if (!slots.info) {
          return null;
        }
        
        return h('div', {}, slots.info({
          loading: loading.value,
          data: item.value
        }));
      };
    }
  });
}