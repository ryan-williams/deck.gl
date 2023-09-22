export {getDefaultCredentials, setDefaultCredentials} from './config';
export {default as CartoLayer} from './layers/carto-layer';
export {default as CartoVectorLayer} from './layers/carto-vector-layer';
export {default as _H3TileLayer} from './layers/h3-tile-layer';
export {default as _PointLabelLayer} from './layers/point-label-layer';
export {default as _QuadbinTileLayer} from './layers/quadbin-tile-layer';
export {default as _RasterTileLayer} from './layers/raster-tile-layer';
export {default as BASEMAP} from './basemap';
export {default as colorBins} from './style/color-bins-style';
export {default as colorCategories} from './style/color-categories-style';
export {default as colorContinuous} from './style/color-continuous-style';
export {
  FORMATS,
  TILE_FORMATS,
  MAP_TYPES,
  API_VERSIONS,
  CartoAPIError,
  fetchLayerData,
  fetchMap,
  getDataV2 as _getDataV2,
  mapInstantiation as _mapInstantiation
} from './api';
export type {APIErrorContext, QueryParameters} from './api';
export type {CartoLayerProps} from './layers/carto-layer';

export {SOURCE_DEFAULTS} from './sources/common';
export type {
  CartoSourceOptionalOptions,
  CartoSourceRequiredOptions,
  CartoTilejsonResult
} from './sources/common';
export {CartoVectorTableSource} from './sources/vector-table-source';
export type {CartoVectorTableSourceOptions} from './sources/vector-table-source';
export {CartoVectorTilesetSource} from './sources/vector-tileset-source';
export type {CartoVectorTilesetSourceOptions} from './sources/vector-tileset-source';
export {CartoVectorQuerySource} from './sources/vector-query-source';
export type {CartoVectorQuerySourceOptions} from './sources/vector-query-source';
