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

    async delete(index) {
        const toDeleteId = this.list[index]._id;
        await axios.post("/agency/delete", {
            _id: toDeleteId
        });
        runInAction(() => {
            this.list.splice(index, 1);
            this.totalCount -= 1;
        });
    }

    async deleteMultiple(indexes) {
        const toDeleteIds = indexes.map((index) => this.list[Number(index)]._id);
        // console.log("toDeleteIds", toDeleteIds);
        // await axios.post("/hospitals/delete", toDeleteIds);
        toDeleteIds.forEach(async (id) => {
            await axios.post("/agency/delete", {
                _id: id
            });
        });
        await this.fetchAll();
    }

    async import(data) {
        await axios.post("/agency/import", data);
        await this.fetchAll();
    }
}

export default CommunityStore;
