import { boot } from 'quasar/wrappers';
import { modals } from 'components/modals/ModalsComponents';

export default boot(({app}) => {
    app.config.globalProperties.$modalsComponents = modals
})

