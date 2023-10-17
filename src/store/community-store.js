import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class CommunityStore {
    list = [];

    totalCount = 0;

    fetched = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll() {
        const response = await axios.post("/agency/list", {
            type: "community"
        });
        const { data, totalCount } = response.data;
        runInAction(() => {
            this.list = data;
            this.totalCount = totalCount;
            this.fetched = true;
        });
    }
}

export default CommunityStore;
