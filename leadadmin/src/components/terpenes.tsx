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
export const TerpeneList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <NumberField source="percent" />
        </Datagrid>
    </List>
);

// Create component
const TerpeneCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Terpene created successfully!');
        redirect('/terpenes');
        refresh();
    };

    return (
        <Create onSuccess={onSuccess}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <NumberInput source="percent" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default TerpeneCreate;
