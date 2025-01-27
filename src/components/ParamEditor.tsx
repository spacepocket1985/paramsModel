import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';

type ParamType = 'string' | 'number' | 'select';

export interface Param<T> {
  id: number;
  name: string;
  type: ParamType;
  options?: T[]; // Опции выбора, если параметр типа 'select'
}

interface ParamValue<T> {
  paramId: number;
  value: T;
}

export interface Model<T> {
  paramValues: ParamValue<T>[];
  colors?: string[];
}

interface Props<T> {
  params: Param<T>[];
  model: Model<T>;
}

interface State<T> {
  paramValues: ParamValue<T>[];
  showModel: boolean;
}

class ParamEditor<T extends string | number> extends React.Component<
  Props<T>,
  State<T>
> {
  state: State<T> = {
    paramValues: this.props.model.paramValues,
    showModel: false,
  };

  handleInputChange = (id: number, value: T) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === id ? { ...paramValue, value: value } : paramValue
      ),
    }));
  };

  handleClickBtn = () =>
    this.setState((prevState) => ({
      ...prevState,
      showModel: !this.state.showModel,
    }));

  getModel = (): Model<T> => {
    return {
      paramValues: this.state.paramValues,
      colors: [],
    };
  };

  render() {
    return (
      <div className="editorWrapper">
        {this.props.params.map((param) => (
          <div key={param.id} className="editorField">
            <label>{param.name}:</label>
            {param.type === 'string' || param.type === 'number' ? (
              <input
                type={param.type === 'number' ? 'number' : 'text'}
                value={
                  this.state.paramValues.find((p) => p.paramId === param.id)
                    ?.value || ''
                }
                onChange={(e) =>
                  this.handleInputChange(
                    param.id,
                    param.type === 'number'
                      ? (Number(e.target.value) as T)
                      : (e.target.value as T)
                  )
                }
              />
            ) : param.type === 'select' && param.options ? (
              <select
                value={
                  this.state.paramValues.find((p) => p.paramId === param.id)
                    ?.value || ''
                }
                onChange={(e) =>
                  this.handleInputChange(param.id, e.target.value as T)
                }
              >
                {param.options.map((option) => (
                  <option key={option.toString()} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button onClick={this.handleClickBtn}>
          {!this.state.showModel ? 'Получить модель' : 'Скрыть модель'}
        </button>
        {this.state.showModel && (
          <div className="response">
            <JsonView
              data={this.getModel()}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ParamEditor;
