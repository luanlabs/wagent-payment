import store from '../store';
import { setData } from '../store/data';
import getOrderDataRequest from '../utils/getOrderDataRequest';

let interval: NodeJS.Timeout | null = null;

const getOrderData = (id: string | undefined) => {
  const dispatch = store.dispatch;

  if (interval) {
    clearInterval(interval);
  }

  if (!id) return;

  const fetchData = async () => {
    try {
      const { data } = await getOrderDataRequest(id);
      dispatch(setData({ data: data.result, loading: false, error: false }));

      if (data.result.status === 'completed' && interval) {
        clearInterval(interval);
        interval = null;
      }
    } catch (error) {
      dispatch(setData({ data: null, loading: false, error: true }));
    }
  };

  fetchData();

  interval = setInterval(fetchData, 3000);
};

export default getOrderData;
