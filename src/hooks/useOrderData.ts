import store from '../store';
import { setData } from '../store/data';
import getOrderDataRequest from '../utils/getOrderDataRequest';

const getOrderData = async (id: string | undefined) => {
  setInterval(async () => {
    const dispatch = store.dispatch;
    if (id) {
      try {
        const { data } = await getOrderDataRequest(id);
        dispatch(setData({ data: data.result, loading: false, error: false }));
      } catch (error) {
        dispatch(setData({ data: null, loading: false, error: true }));
      }
    }
  }, 3000);
};

export default getOrderData;
