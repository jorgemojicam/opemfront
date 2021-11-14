
import moment from "moment";

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return moment(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return moment(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    certificadosManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id_cert)
        },
        certificadosOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.id_cert, value: val.id }
        },
        certificadosManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.id_cert,
                id: item.id
            }))
        },
        empresaManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.ide_emp)
        },
        empresaOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.ide_emp, value: val.id }
        },
        empresaManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.ide_emp,
                id: item.id
            }))
        },
        productsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.idproduct)
        },
        productsOneListFormatter(val) {
            if (!val) return {label: null, value: null}
            return {label: val.idproduct, value: val.id }
        },
        productsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => ({
                label: item.idproduct,
                id: item.id
            }))
        },
        
}
