import AbstractDesignerComponent from "../../../framework/core/AbstractDesignerComponent";
import {ComponentInfoType} from "../../common-component/common-types";
import BaseImageComponent, {BaseImageComponentStyle} from "./BaseImageComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import ObjectUtil from "../../../utils/ObjectUtil";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface BaseImageComponentProps {
    info?: ComponentInfoType;
    style?: BaseImageComponentStyle;
}


export default class BaseImage extends AbstractDesignerComponent<BaseImageComponent, BaseImageComponentProps> {

    public async create(container: HTMLElement, config: BaseImageComponentProps): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BaseImageComponent, config.style);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseImageComponentProps | null {
        return this.config;
    }

    update(config: BaseImageComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender) {
            console.log('update', this.config?.style);
            this.instance?.setState(this.config?.style!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }

}