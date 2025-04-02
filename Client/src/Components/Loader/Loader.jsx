import { Oval } from 'react-loader-spinner';

function Loader() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#1E88E5"
                secondaryColor="#1E88E5"
                strokeWidth={2}
                strokeWidthSecondary={2}
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default Loader;