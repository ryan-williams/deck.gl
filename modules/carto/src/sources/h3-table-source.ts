import {CartoBaseSource} from './base-source';
import {
  CartoAggregationOptions,
  CartoSourceOptionalOptions,
  CartoSourceRequiredOptions,
  CartoTableSourceOptions,
  TilejsonSource
} from './common';

export type CartoH3TableSourceOptions = CartoSourceRequiredOptions &
  Partial<CartoSourceOptionalOptions> &
  CartoTableSourceOptions &
  CartoAggregationOptions;

type UrlParameters = {
  columns?: string;
  geo_column?: string;
  name: string;
  aggregationExp?: string;
  aggregationResLevel?: string;
};

const CartoH3TableSource: TilejsonSource<CartoH3TableSourceOptions> = async function (
  options: CartoH3TableSourceOptions
): Promise<any> {
  const {
    aggregationExp = '1 AS value',
    aggregationResLevel = 4,
    columns,
    spatialDataColumn = 'h3:h3',
    tableName
  } = options;
  const urlParameters: UrlParameters = {name: tableName};

  if (columns) {
    urlParameters.columns = columns.join(',');
  }
  if (spatialDataColumn) {
    urlParameters.geo_column = spatialDataColumn;
  }
  if (aggregationExp) {
    urlParameters.aggregationExp = aggregationExp;
  }
  if (aggregationResLevel) {
    urlParameters.aggregationResLevel = String(aggregationResLevel);
  }
  return CartoBaseSource<UrlParameters>('table', options, urlParameters);
};

export {CartoH3TableSource};
