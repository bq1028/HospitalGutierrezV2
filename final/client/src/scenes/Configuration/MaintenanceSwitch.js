import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import config from 'react-global-configuration';
import axios from 'axios';

class MaintenanceSwitch extends Component {
  state = {
    maintenance: config.get('config').maintenance
  };

  handleChange = name => event => {
    let prevConfig = config.get('config')
    prevConfig.maintenance = event.target.checked
    config.set({ config: prevConfig })
    axios.put(config.get('config').api + 'Configurations/toggleMaintenance')
    this.setState({ maintenance: event.target.checked })


    window.location.reload()


  };

  render() {
    let active = this.state.maintenance
    let label = (active ? 'Activado' : 'Desactivado')

    return (
      <FormControlLabel
        control={
          <Switch
            checked={active}
            onChange={this.handleChange()}
          />
        }
        label={label}
      />
    );
  }
}

export default MaintenanceSwitch
