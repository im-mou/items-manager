import { Container } from './components/design-system';
import Hero from './parts/Hero';
import ItemsView from './parts/ItemsView';
import TopBar from './parts/TopBar';

const App = () => {
    return (
        <Container>
            <TopBar />
            <Hero />
            <ItemsView />
        </Container>
    );
};

export default App;
