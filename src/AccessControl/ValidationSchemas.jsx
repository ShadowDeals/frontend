import * as Yup from 'yup';

const commonFields = {
    email: Yup.string()
        .email('Неверный формат email')
        .required('Введите почту'),
    password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Введите пароль'),
    passwordConfirm: Yup.string()
        .required('Подтвердите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
};

const optionalRegionField = {
    specifyRegion: Yup.boolean(),
    region: Yup.string().when('specifyRegion', {
        is: true,
        then: (schema) => schema.required('Выберите регион'),
        otherwise: (schema) => schema.notRequired(),
    }),
};

const requiredRegionField = {
    region: Yup.string().required('Выберите регион'),
};

export const formConfigs = {
    user: {
        initialValues: {
            username: '',
            email: '',
            specifyRegion: false,
            region: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Введите имя'),
            ...commonFields,
            ...optionalRegionField,
        }),
    },

    administrator: {
        initialValues: {
            surname: '',
            name: '',
            specifyRegion: false,
            region: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            surname: Yup.string().required('Обязательно'),
            name: Yup.string().required('Обязательно'),
            ...commonFields,
            ...optionalRegionField,
        }),
    },
    soldier: {
        initialValues: {
            surname: '',
            name: '',
            specifyRegion: false,
            region: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            surname: Yup.string().required('Обязательно'),
            name: Yup.string().required('Обязательно'),
            ...commonFields,
            ...optionalRegionField,
        }),
    },

    don: {
        initialValues: {
            surname: '',
            name: '',
            region: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            surname: Yup.string().required('Обязательно'),
            name: Yup.string().required('Обязательно'),
            region: Yup.string()
                .required('Выберите регион')
                .notOneOf(['', 'Выберите регион'], 'Выберите регион'),
            ...commonFields,
            ...requiredRegionField,
        }),
    },
};
