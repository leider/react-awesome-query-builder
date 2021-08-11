/*eslint no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React, {Component} from "react";
import {
  Query, Builder, Utils,
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import loadedConfig from "../data/config_with_nested_properties";
import loadedInitValue from "../data/tree.json";
const stringify = JSON.stringify;
const {jsonLogicFormat, getTree, checkTree, loadTree, uuid, loadFromJsonLogic} = Utils;
const preStyle = { backgroundColor: "darkgrey", margin: "10px", padding: "10px" };
const preErrorStyle = { backgroundColor: "lightpink", margin: "10px", padding: "10px" };

const emptyInitValue = {"id": uuid(), "type": "group"};

const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue;
const initTree = checkTree(loadTree(initValue), loadedConfig);


export default class DemoQueryBuilder extends Component {

    state = {
      tree: initTree,
      config: loadedConfig
    };

    render = () => (
      <div>
        <Query

          {...loadedConfig}
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />

        <button onClick={this.resetValue}>reset</button>
        <button onClick={this.clearValue}>clear</button>
        <button onClick={this.reparseJsonLogic}>reparse</button>

        <div className="query-builder-result">
          {this.renderResult(this.state)}
        </div>
      </div>
    )

    resetValue = () => {
      this.setState({
        tree: initTree,
      });
    };

    reparseJsonLogic = () => {
      const {logic} = jsonLogicFormat(this.state.tree, this.state.config);
      const imTreeFromJsonLogic = loadFromJsonLogic(logic, this.state.config);
      this.setState({
        tree: imTreeFromJsonLogic
      });
    }

    clearValue = () => {
      this.setState({
        tree: loadTree(emptyInitValue),
      });
    };

    renderBuilder = (props) => (
      <div className="query-builder-container" style={{padding: "10px"}}>
        <div className="query-builder">
          <Builder {...props} />
        </div>
      </div>
    )

    onChange = (immutableTree, config) => {
      this.immutableTree = immutableTree;
      this.config = config;
      this.updateResult();
    }

    updateResult = throttle(() => {
      this.setState({tree: this.immutableTree, config: this.config});
    }, 100)

    renderResult = ({tree: immutableTree, config}) => {
      const {logic, data, errors} = jsonLogicFormat(immutableTree, config);
      return (
        <div>
          <br />
          <hr/>
          <div>
            <a href="http://jsonlogic.com/play.html" target="_blank" rel="noopener noreferrer">jsonLogicFormat</a>:
            { errors.length > 0
              && <pre style={preErrorStyle}>
                {stringify(errors, undefined, 2)}
              </pre>
            }
            { !!logic
              && <pre style={preStyle}>
                {"// Rule"}:<br />
                {stringify(logic, undefined, 2)}
              </pre>
            }
          </div>
          <hr/>
          <div>
                Tree:
            <pre style={preStyle}>
              {stringify(getTree(immutableTree), undefined, 2)}
            </pre>
          </div>
        </div>
      );
    }

}

