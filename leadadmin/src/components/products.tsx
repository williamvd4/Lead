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
export const ProductsList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="thc" />
            <NumberField source="cbd" />
            <TextField source="effects" />
            <TextField source="terpenes" />
        </Datagrid>
    </List>
);

// Create component
const ProductCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Product created successfully!');
        redirect('/products');
        refresh();
    };

    return (
        <Create onSuccess={onSuccess}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <TextInput source="description" validate={required()} />
                <NumberInput source="thc" validate={required()} />
                <NumberInput source="cbd" validate={required()} />
                <TextInput source="effects" validate={required()} />
                <TextInput source="terpenes" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default ProductCreate;
