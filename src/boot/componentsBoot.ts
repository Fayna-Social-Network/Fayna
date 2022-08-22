import { boot } from 'quasar/wrappers';
import { AsyncComponents } from 'src/components/AsyncComponents';

export default boot(({app}) => {
    app.config.globalProperties.$asyncComponents = AsyncComponents
})

