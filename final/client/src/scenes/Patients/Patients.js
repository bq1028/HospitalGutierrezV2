import React, { Component, Fragment} from "react";
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import FixedBottomButton from '../../components/FixedBottomButton/FixedBottomButton';
import { Route, Switch } from "react-router-dom";
import FullPatientPage from './FullPatient/FullPatient';
import ConsultsPage from './Consults/Consults';
import ChartsPage from './Charts/Charts';
import PatientsListPage from './PatientsList/EnhancedTable';
import CreateOrUpdatePatient from './CreateOrUpdatePatient/CreateOrUpdatePatient';
import Error404 from "../Errors/404";
import AddPropsToRoute from '../../hoc/AddPropsToRoute'
import PrivateRoute from '../../components/CustomRoutes/PrivateRoute'

class Patients extends Component{
    state = {
        loading: true,
        documentTypes: [],
        insurances: [],
        houseTypes: [],
        waterTypes: [],
        heatingTypes: [],
      }

    getDocumentTypes(){
      fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-documento")
        .then(response => response.json())
        .then(data => { this.setState({ documentTypes: data }) })
    }

    getInsurances(){
      fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "obra-social")
        .then(response => response.json())
        .then(data => { this.setState({ insurances: data }) })
    }

    getHouseTypes(){
      fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-vivienda")
        .then(response => response.json())
        .then(data => { this.setState({ houseTypes: data }) })
    }

    getWaterTypes(){
      fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-agua")
        .then(response => response.json())
        .then(data => { this.setState({ waterTypes: data }) })
    }

    getHeatingTypes(){
      fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-calefaccion")
        .then(response => response.json())
        .then(data => { this.setState({ heatingTypes: data, loading: false }) })
    }

    componentWillMount = () => {
        this.getDocumentTypes()
        this.getInsurances()
        this.getHouseTypes()
        this.getWaterTypes()
        this.getHeatingTypes()
    }

    arrayFromStateField(field){
        const array = [];
        Object.values(this.state[field]).forEach(value => {
            array[value.id] = value.nombre
        });
        return array
    }

    render() {

        let show = null;

        if (this.state.loading){
                show = < CircularIndeterminate />
        }

        const documentTypes = this.arrayFromStateField('documentTypes');

        const insurances = this.arrayFromStateField('insurances');

        const waterTypes = this.arrayFromStateField('waterTypes');

        const houseTypes = this.arrayFromStateField('houseTypes');

        const heatingTypes = this.arrayFromStateField('heatingTypes');

        let passingProps = {
            roles: this.props.roles,
            user: this.props.user
          }


        return (
            <Fragment>
                {show}
                <Switch>
                    <Route path="/patients/new" exact
                        render={ (routeProps) =>
                            <div>
                                <CreateOrUpdatePatient
                                    routeProps={routeProps}
                                    documentTypes={documentTypes}
                                    insurances={insurances}
                                    waterTypes={waterTypes}
                                    houseTypes={houseTypes}
                                    heatingTypes={heatingTypes}
                                    />
                            </div>
                    } />
                    <Route path="/patients/" exact
                        render={ (routeProps) =>
                            <div>
                                <PatientsListPage 
                                    roles={this.props.roles}
                                    routeProps={routeProps} 
                                    documentTypes={documentTypes}/>
                                <FixedBottomButton path="/patients/new" />
                            </div>

                    } />
                    <Route path="/patients/:id" exact
                        render={ (routeProps) =>
                            <div>
                                <FullPatientPage 
                                    roles={this.props.roles}
                                    routeProps={routeProps} 
                                    documentTypes={documentTypes}
                                    insurances={insurances}
                                    waterTypes={waterTypes}
                                    houseTypes={houseTypes}
                                    heatingTypes={heatingTypes} />
                            </div>
                        }/>
                    <Route path="/patients/update/:id" exact
                        render={ (routeProps) =>
                            <div>
                                <CreateOrUpdatePatient
                                    routeProps={routeProps}
                                    documentTypes={documentTypes}
                                    insurances={insurances}
                                    waterTypes={waterTypes}
                                    houseTypes={houseTypes}
                                    heatingTypes={heatingTypes} />
                            </div>
                        }/>
                    <PrivateRoute path="/patients/:id/consults" permissions={["Pediatra","Administrador"]}  component={AddPropsToRoute(ConsultsPage, passingProps)} />
                    <Route path="/patients/:id/charts" component={ChartsPage} />
                    <Route component={Error404} />
                </Switch>
            </ Fragment>
        );
    }

}

export default Patients;
