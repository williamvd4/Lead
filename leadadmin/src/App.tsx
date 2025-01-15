import {
  Admin,
  Resource,
 
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { ProductsList } from "./components/products";
import ProductCreate from './components/products';
import { EffectsList } from "./components/effects";
import EffectsCreate from './components/effects';
import { LabResultsList } from "./components/labresults";
import LabResultsCreate from './components/labresults';
import { RetailersList } from "./components/retailers";
import RetailersCreate from './components/retailers';


export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="products" list={ProductsList} create={ProductCreate}/>
    <Resource name="effects" list={EffectsList} create={EffectsCreate}/>
    <Resource name="labresults" list={LabResultsList} create={LabResultsCreate}/>
    <Resource name="retailers" list={RetailersList} create={RetailersCreate}/>
  </Admin>
);
