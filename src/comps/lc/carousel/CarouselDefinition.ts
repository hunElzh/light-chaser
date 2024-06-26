import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import carouselImg from './carousel.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {CarouselController} from "./CarouselController.ts";
import {CarouselComponentProps} from "./CarouselComponent.tsx";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {CarouselConfig} from "./CarouselConfig.tsx";
import DataConfig from "../../common-component/data-config/DataConfig.tsx";

export default class CarouselDefinition extends AbstractDefinition<CarouselController, CarouselComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "轮播图",
            compKey: "carousel",
            categorize: "web",
        };
    }

    getChartImg(): string | null {
        return carouselImg;
    }

    getController(): ClazzTemplate<CarouselController> | null {
        return CarouselController;
    }

    getInitConfig(): CarouselComponentProps {
        return {
            base: {
                id: "",
                name: '轮播图',
                type: 'carousel',
            },
            style: {
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                fade: false,
                speed: 500,
            },
            data: {
                sourceType: 'static',
                staticData: [carouselImg, carouselImg]
            }
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: CarouselConfig,
            animation: AnimationConfig,
            data: DataConfig,
            theme: ThemeConfig
        };
    }


    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "click",
                name: "点击时",
            }
        ]);
    }
}