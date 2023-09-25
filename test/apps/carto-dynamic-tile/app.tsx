/* global document */
/* eslint-disable no-console */
import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {
  CartoQuadbinTableSource,
  CartoVectorTableSource,
  CartoVectorTilesetSource,
  CartoVectorQuerySource,
  CartoTilejsonResult,
  CartoVectorLayer,
  QuadbinTileLayer,
  colorBins
} from '@deck.gl/carto';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const INITIAL_VIEW_STATE = {longitude: -87.65, latitude: 41.82, zoom: 10};

const apiBaseUrl = 'https://gcp-us-east1.api.carto.com';
const connectionName = 'bigquery';

const config = {
  'quadbin-table': {
    Source: CartoQuadbinTableSource,
    tableName: 'carto-demo-data.demo_tables.derived_spatialfeatures_usa_quadbin15_v1_yearly_v2',
    aggregationExp: 'avg(population) as population_average',
    getFillColor: colorBins({
      attr: 'population_average',
      domain: [10, 50, 100, 250, 500, 1000],
      colors: 'SunsetDark'
    })
  },
  'vector-query': {
    Source: CartoVectorQuerySource,
    sqlQuery:
      'select geom, district from carto-demo-data.demo_tables.chicago_crime_sample where year > 2016',
    getFillColor: [255, 0, 0]
  },
  'vector-table': {
    Source: CartoVectorTableSource,
    tableName: 'carto-demo-data.demo_tables.chicago_crime_sample',
    columns: ['date', 'year'],
    getFillColor: colorBins({
      attr: 'year',
      domain: [2002, 2006, 2010, 2016, 2020],
      colors: 'Magenta'
    })
  },
  'vector-table-dynamic': {
    Source: CartoVectorTableSource,
    tableName: 'carto-demo-data.demo_tables.osm_buildings_usa',
    spatialDataColumn: 'geog',
    getFillColor: [131, 44, 247]
  },
  'vector-tileset': {
    Source: CartoVectorTilesetSource,
    tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    getFillColor: colorBins({
      attr: 'income_per_capita',
      domain: [15000, 25000, 35000, 45000, 60000],
      colors: 'OrYel'
    })
  }
};

const accessToken = 'XXX';

const globalOptions = {accessToken, apiBaseUrl, connectionName}; // apiBaseUrl not required

function Root() {
  const [dataset, setDataset] = useState('quadbin-table');
  const datasource = config[dataset];
  let layers;

  if (dataset.includes('quadbin')) {
    layers = [createQuadbinLayer(datasource)];

  } else if (dataset.includes('vector')) {
    layers = [createVectorLayer(datasource)];
  } 

  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({object}) => {
          const properties = object?.properties;
          if (!properties) return null;
          return Object.entries(properties)
            .map(([k, v]) => `${k}: ${v}\n`)
            .join('');
        }}
      >
        <StaticMap mapStyle={MAP_STYLE} />
      </DeckGL>
      <ObjectSelect
        title="dataset"
        obj={Object.keys(config)}
        value={dataset}
        onSelect={setDataset}
      />
    </>
  );
}

function createQuadbinLayer(datasource) {
  const {getFillColor, Source, aggregationExp, columns, spatialDataColumn, sqlQuery, tableName} = datasource;
  // useMemo to avoid a map instantiation on every re-render
  const tilejson = useMemo<Promise<CartoTilejsonResult>>(() => {
    return Source({...globalOptions, aggregationExp, columns, spatialDataColumn, sqlQuery, tableName});
  }, [Source, aggregationExp, columns, spatialDataColumn, sqlQuery, tableName]);

  return new QuadbinTileLayer({
    id: 'carto',
    data: tilejson,
    pickable: true,
    stroked: false,
    getFillColor
  });
}

function createVectorLayer(datasource) {
  const {getFillColor, Source, columns, spatialDataColumn, sqlQuery, tableName} = datasource;
  // useMemo to avoid a map instantiation on every re-render
  const tilejson = useMemo<Promise<CartoTilejsonResult>>(() => {
    return Source({...globalOptions, columns, spatialDataColumn, sqlQuery, tableName});
  }, [Source, null, columns, spatialDataColumn, sqlQuery, tableName]);

  return new CartoVectorLayer({
    id: 'carto',
    // @ts-ignore
    data: tilejson, // TODO how to correctly specify data type?
    pickable: true,
    pointRadiusMinPixels: 5,
    getFillColor
  });
}

function ObjectSelect({title, obj, value, onSelect}) {
  const keys = Object.values(obj).sort() as string[];
  return (
    <>
      <select
        onChange={e => onSelect(e.target.value)}
        style={{position: 'relative', padding: 4, margin: 2, width: 250}}
        value={value}
      >
        <option hidden>{title}</option>
        {keys.map(f => (
          <option key={f} value={f}>
            {`${title}: ${f}`}
          </option>
        ))}
      </select>
      <br></br>
    </>
  );
}

const container = document.body.appendChild(document.createElement('div'));
createRoot(container).render(<Root />);
