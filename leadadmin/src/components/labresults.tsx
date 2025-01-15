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
    DateField,
} from 'react-admin';

// List component
export const LabResultsList = () => (
    <List>
        <Datagrid>
            <TextField source="batch number" />
            <TextField source="Strain" />
            <NumberField source="thc" />
            <NumberField source="cbd" />
            <DateField source="date" />
            <TextField source="lab" />
        </Datagrid>
    </List>
);

// Create component
const LabResultsCreate = () => {
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
                <TextInput source="batch number" validate={required()} />
                <TextInput source="strain" validate={required()} />
                <NumberInput source="thc" validate={required()} />
                <NumberInput source="cbd" validate={required()} />
                <TextInput source="date" validate={required()} />
                <TextInput source="lab" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default LabResultsCreate;
