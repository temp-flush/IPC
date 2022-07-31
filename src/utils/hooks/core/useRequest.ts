import { ref, shallowRef } from 'vue';

export function useRequest<T>(
  request: <P>(params?: any) => Promise<P>,
  opts?: {
    autoRun: boolean;
    isTree: boolean;
  },
) {
  const { autoRun = true, isTree = false } = opts ?? {};
  const result = shallowRef<T>();
  const loading = ref(false);
  const error = ref<Error>();

  let latestToken = Math.random();
  const run = async (params?: any) => {
    try {
      loading.value = true;
      const curToken = (latestToken = Math.random());
      let data = await request<T>(params);
      data = data.items ? data.items : data;
      if (curToken !== latestToken) return;
      console.log(data);
      if (isTree) {
        data &&
          data.forEach((v) => {
            v.data = {
              id: v.id,
              name: v.name,
            };
            v.key = v.id;
            v.parentId = 0;
            v.title = v.name;
          });
      }
      result.value = data;
    } catch (err) {
      error.value = err as Error;
    }
    loading.value = false;
  };
  autoRun && run();

  return { data: result, loading, error, run };
}
