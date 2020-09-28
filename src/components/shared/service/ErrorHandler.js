/* Handling Errors through Toastr */
import Vue from 'vue';

export const successToaster = (title, desc) => {
    const vm = new Vue();
    return  vm.$bvToast.toast(`${desc}`, {
        title: `${title}`,
        autoHideDelay: 5000,
        variant: 'success',
        appendToast: false
    })
}
export const errorToaster = (title, desc) => {
    const vm = new Vue();
    return  vm.$bvToast.toast(`${desc}`, {
        title: `${title}`,
        autoHideDelay: 5000,
        variant: 'danger',
        appendToast: false
    })
}

export const warnToaster = (title, desc) => {
    const vm = new Vue();
    return  vm.$bvToast.toast(`${desc}`, {
        title: `${title}`,
        autoHideDelay: 5000,
        variant: 'warning',
        appendToast: false
    })
}

export const infoToaster = (title, desc) => {
    const vm = new Vue();
    return  vm.$bvToast.toast(`${desc}`, {
        title: `${title}`,
        autoHideDelay: 5000,
        variant: 'info',
        appendToast: false
    })
}
