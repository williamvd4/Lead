import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import dataProvider from '../dataProvider';

const AdminPage = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="about" list={ListGuesser} edit={EditGuesser} />
    <Resource name="cultivation" list={ListGuesser} edit={EditGuesser} />
    <Resource name="home" list={ListGuesser} edit={EditGuesser} />
    <Resource name="labresults" list={ListGuesser} edit={EditGuesser} />
    <Resource name="products" list={ListGuesser} edit={EditGuesser} />
    <Resource name="retailers" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminPage;
