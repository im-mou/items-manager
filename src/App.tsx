import { Container } from './components/design-system';
import Hero from './parts/Hero';
import TopBar from './parts/TopBar';

const App = () => {
    return (
        <Container>
            <TopBar />
            <Hero />
        </Container>
    );
};

export default App;
