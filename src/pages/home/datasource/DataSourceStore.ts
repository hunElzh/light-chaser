import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";
import FetchUtil from "../../../utils/FetchUtil.ts";
import {IPage} from "../../../designer/DesignerType.ts";

export const DataSourceMapping = {
    "0": "MySQL",
    "1": "PostgresSQL",
    "2": "Oracle",
    "3": "SQL Server",
}

export class DataSourceStore {
    constructor() {
        makeObservable(this, {
            createVisible: observable,
            editVisible: observable,
            dataSourcePageData: observable,
            setCreateVisible: action,
            setEditVisible: action,
            setDataSourceList: action,
            setDataSource: action,
            changeCurrentPage: action,
        })
    }

    createVisible = false;

    editVisible = false;

    searchValue: string | null = null;

    dataSourcePageData: IPage<DataSourceConfigType[]> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    dataSource: DataSourceConfigType = {
        id: "",
        name: '',
        type: '',
        username: '',
        password: '',
        url: '',
        des: ''
    }

    setCreateVisible = (visible: boolean) => this.createVisible = visible;

    setEditVisible = (visible: boolean) => this.editVisible = visible;

    setDataSourceList = (dataSourcePageData: IPage<DataSourceConfigType[]>) => this.dataSourcePageData = dataSourcePageData;

    setDataSource = (dataSource: DataSourceConfigType) => this.dataSource = dataSource;

    changeCurrentPage = (page: number) => {
        this.dataSourcePageData.current = page;
        this.getDataSourceList();
    }

    testDataSource = (id: string) => {
        FetchUtil.get(`/api/datasource/test/${id}`).then(res => {
            if (res.code === 200)
                globalMessage.messageApi?.success(res.msg);
            else
                globalMessage.messageApi?.error(res.msg);
        })
    }


    deleteDataSource = (id: string) => {
        FetchUtil.get(`/api/datasource/del/${id}`).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    copyDataSource = (id: string) => {
        FetchUtil.get(`/api/datasource/copy/${id}`).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    openDataSourceEditor = (id: string) => {
        FetchUtil.get(`/api/datasource/get/${id}`).then(res => {
            if (res.code === 200) {
                this.setDataSource(res.data);
                this.setEditVisible(true);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    getDataSourceList = () => {
        FetchUtil.post(`/api/datasource/pageList`, {
            current: this.dataSourcePageData.current,
            size: this.dataSourcePageData.size,
            searchValue: this.searchValue
        }).then(res => {
            let {code, data, msg} = res;
            if (code === 200) {
                (data.records as Array<DataSourceConfigType>).forEach((item) => {
                    item.key = item.id;
                    item.type = DataSourceMapping[item!.type as keyof typeof DataSourceMapping];
                })
                this.setDataSourceList({
                    records: data.records,
                    total: data.total,
                    size: data.size,
                    current: data.current
                });
                this.searchValue = null;
            } else {
                if (code === 500)
                    msg = "服务器链接失败";
                globalMessage.messageApi?.error(msg);
            }
        })
    }

    updateDataSource = (data: DataSourceConfigType) => {
        FetchUtil.post(`/api/datasource/update`, data).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setEditVisible(false);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    createDataSource = (data: DataSourceConfigType) => {
        FetchUtil.post(`/api/datasource/add`, data).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setCreateVisible(false);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

}

const dataSourceStore = new DataSourceStore();
export default dataSourceStore;
