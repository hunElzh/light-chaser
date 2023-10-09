import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonScatterController, {AntdScatterProps} from "./AntdCommonScatterController";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdScatterCommonStyleConfig = React.lazy(() => import("./AntdScatterCommonConfig").then((module) => ({default: module.AntdScatterCommonStyleConfig})));
const AntdScatterFieldMapping = React.lazy(() => import("./AntdScatterCommonConfig").then((module) => ({default: module.AntdScatterFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractScatterDefinition extends AbstractComponentDefinition<AntdCommonScatterController, AntdScatterProps> {

    getComponent(): ClazzTemplate<AntdCommonScatterController> | null {
        return AntdCommonScatterController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdScatterCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdScatterFieldMapping
        };
    }
}

export default AbstractScatterDefinition;
