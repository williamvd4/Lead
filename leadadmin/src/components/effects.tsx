import {
    List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    required,
    useNotify,
    useRedirect,
    useRefresh,
} from 'react-admin';

// List compone
export const EffectsList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
        </Datagrid>
    </List>
);

// Create component
const EffectsCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Effect created successfully!');
        redirect('/effects');
        refresh();
    };

    return (
        <Create onSuccess={onSuccess}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default EffectsCreate;
