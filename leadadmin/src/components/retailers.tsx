import {
    List,
    Datagrid,
    TextField,
    NumberField,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    required,
    useNotify,
    useRedirect,
    useRefresh,
} from 'react-admin';

// List component
export const RetailersList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <TextField source="address" />
            <TextField source="products" />
        </Datagrid>
    </List>
);

// Create component
const RetailersCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Retailer added successfully!');
        redirect('/retailers');
        refresh();
    };

    return (
        <Create onSuccess={onSuccess}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <TextInput source="address" validate={required()} />
                <TextInput source="products" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default RetailersCreate;
