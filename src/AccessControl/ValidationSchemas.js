import * as Yup from 'yup';
import {taskTypeLabels} from "../Common/Cards.jsx";

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

export const registerFormConfigs = {
    user: {
        initialValues: {
            username: '',
            email: '',
            // specifyRegion: false,
            // region: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Введите имя'),
            ...commonFields,
            ...optionalRegionField,
        }),
    },
    admin: {
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

export const reportFormConfig = {
    initialValues: {
        status: 'success',
        timeSpent: 0,
        description: '',
    },
    validationSchema: Yup.object({
        status: Yup.string().oneOf(['success', 'failed']).required('Выберите статус'),
        description: Yup.string().trim().required('Заполните это поле'),
        timeSpent: Yup.number()
            .typeError('Введите число')
            .required('Укажите количество часов')
            .min(0, 'Часы не могут быть отрицательными'),
    }),
};

export const createTaskFormConfig = {
    initialValues: {
        address: '',
        description: '',
        taskType: '',
        region: '',
    },
    validationSchema: Yup.object({
        address: Yup.string().trim().required('Введите адрес'),
        description: Yup.string().trim().required('Введите описание'),
        taskType: Yup.string()
            .oneOf(Object.keys(taskTypeLabels), 'Недопустимый тип задания')
            .required('Выберите тип задания'),
        region: Yup.string().trim().optional(),
    }),
};

export const setPriceFormConfig = {
    initialValues: { price: '' },
    validationSchema: Yup.object({
        price: Yup.number()
            .typeError('Введите число')
            .required('Обязательное поле')
            .positive('Цена должна быть положительной'),
    }),
};


export const PasswordDbLockConfig = {
    initialValues: { password: '' },
    validationSchema: Yup.object().shape({
        password: Yup.string()
            .required('Пароль обязателен')
            .min(4, 'Минимум 6 символов'),
    }),
};

