import {MAP_TYPES} from '../api/maps-api-common';
import {CartoBaseSource} from './base-source';
import {
  CartoAggregationOptions,
  CartoSourceOptionalOptions,
  CartoSourceRequiredOptions,
  CartoTableSourceOptions,
  CartoTilejsonResult
} from './common';

export type CartoQuadbinTableSourceOptions = CartoSourceRequiredOptions &
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

export async function CartoQuadbinTableSource(
  options: CartoQuadbinTableSourceOptions
): Promise<CartoTilejsonResult> {
  const {
    aggregationExp = '1 AS value',
    aggregationResLevel = 6,
    columns,
    spatialDataColumn = 'quadbin:quadbin',
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
  return CartoBaseSource<CartoQuadbinTableSourceOptions, UrlParameters>(
    MAP_TYPES.TABLE,
    options,
    urlParameters
  );
}