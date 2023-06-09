import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faWaterLadder } from '@fortawesome/free-solid-svg-icons'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faTv } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { faSoap } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faVault } from '@fortawesome/free-solid-svg-icons'
import { faGun } from '@fortawesome/free-solid-svg-icons'
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons'
import { faHotTubPerson } from '@fortawesome/free-solid-svg-icons'
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { faHouseFloodWater } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import GoogleMapsAutocomplete from "./components/GoogleMapsAutocomplete.vue";

library.add(faBars,
  faCircleUser,
  faMagnifyingGlass,
  faGlobe,
  faWaterLadder,
  faWifi,
  faCarSide,
  faCheck,
  faUtensils,
  faTv,
  faSnowflake,
  faUserLock,
  faBroom,
  faSoap,
  faPaw,
  faVault,
  faGun,
  faKitchenSet,
  faHotTubPerson,
  faBellConcierge,
  faBed,
  faHouseChimney,
  faPencil,
  faTrashCan,
  faChartSimple,
  faRocket,
  faHouseFloodWater,
  faLayerGroup,
  faIgloo,
  faEye,
  faPlus,
  faEnvelope,
  faMugSaucer,
  faXmark,
  faMinus,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faGear,
  faRightFromBracket,
  faMedal,
  faShare,
  faAward,
  faArrowLeft,
  faPen)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('google-maps-autocomplete', GoogleMapsAutocomplete)
  .mount('#app');