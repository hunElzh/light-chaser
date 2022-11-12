import React, {Component} from 'react';
import './style/AntdBarSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import BarWidth from "./atomic_components/BarWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";

interface AntdBarSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}

class AntdBarSet extends Component<AntdBarSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: value
        })
    }

    render() {
        const {updateChartProps, chartProps, activated} = this.props;
        let paletteCount = 1;
        switch (activated?.type) {
            case 'AntdBaseBar':
            case 'AntdZoneBar':
                //单条的计算条数个数
                paletteCount = chartProps.data.length;
                break;
            case 'AntdGroupBar':
            case 'AntdPercentBar':
            case 'AntdStackBar':
                //分组的计算分组个数
                paletteCount = getAntdDataSortCount(chartProps.data, 'type');
                break;
        }
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor chartProps={chartProps} onChange={this.fillColorChanged} paletteCount={paletteCount}/>
                {/*图例配置*/}
                <Legend chartProps={chartProps} updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartProps={chartProps} updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <BarWidth chartProps={chartProps} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBarSet;