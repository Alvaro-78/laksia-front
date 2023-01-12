import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Views
import { ProviderMainPage } from './views/providerMainPage/ProviderMainPage';
import { InfoFest } from './views/infoFest/InfoFest';
import { Assets } from './views/assets/Assets';
import { Analitics } from './views/analitics/Analitics';
import { Notifications } from './views/notifications/Notifications';
import { Customization } from './views/customization/Customization';
import { Concerts } from './views/concerts/Concerts';
import { ConcertInfo } from './views/concertInfo/ConcertInfo';
import { CapacityControl } from './views/capacityControl/CapacityControl';
import { AssetInfo } from './views/assetInfo/AssetInfo';
// Edit Views
import { EditFest } from './views/EditFest/EditFest';
import { EditConcerts } from './views/EditConcerts/EditConcerts';
import { EditConcert } from './views/EditConcert/EditConcert';
import { EditAsset } from './views/EditAsset/EditAsset';

// Add Views
import { AddInfoFest } from './views/addInfoFest/AddInfoFest';
import { AddConcerts } from './views/addConcerts/AddConcerts';
import { AddConcert } from './views/addConcert/AddConcert';

// Components
import { Login } from './components/login/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Login />} />
				<Route path="provider-main-page" element={<ProviderMainPage />} />
				<Route
					path="provider-main-page/AnadirFestival"
					element={<AddInfoFest />}
				/>
				<Route path="provider-main-page/:providerName" element={<InfoFest />} />
				<Route
					path="provider-main-page/:providerName/AnadirEspacio"
					element={<AddConcerts />}
				/>
				<Route
					path="provider-main-page/:providerName/Editar"
					element={<EditFest />}
				/>
				<Route
					path="provider-main-page/:providerName/:spaceName"
					element={<Concerts />}
				/>
				<Route
					path="provider-main-page/:providerName/:spaceName/AnadirConcierto"
					element={<AddConcert />}
				/>
				<Route
					path="provider-main-page/:providerName/:spaceName/Editar"
					element={<EditConcerts />}
				/>
				<Route
					path="provider-main-page/:providerName/:spaceName/:concertName"
					element={<ConcertInfo />}
				/>
				<Route
					path="provider-main-page/:providerName/:spaceName/:concertName/Editar"
					element={<EditConcert />}
				/>
				<Route path="assets" element={<Assets />} />
				<Route path="assets/:assetName" element={<AssetInfo />} />
				<Route path="assets/:assetName/Editar" element={<EditAsset />} />
				<Route path="analitics" element={<Analitics />} />
				<Route path="notifications" element={<Notifications />} />
				<Route path="customization" element={<Customization />} />
				<Route path="capacity-control" element={<CapacityControl />} />
				{/* excec path means the route that the user gone view on the website bar */}
				{/* <Route exact path="/info-asset" element={<AssetInfo />}/> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
