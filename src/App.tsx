import ParamEditor, { Param, Model } from './components/ParamEditor';

import './App.css';

const params: Param<string | number>[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
  { id: 3, name: 'Вес', type: 'number' },
  {
    id: 4,
    name: 'Цвет',
    type: 'select',
    options: ['Красный', 'Зеленый', 'Синий'],
  },
];

const model: Model<string | number> = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
    { paramId: 3, value: 75 },
    { paramId: 4, value: 'Красный' },
  ],
  colors: [],
};

const App = () => <ParamEditor params={params} model={model} />;

export default App;
