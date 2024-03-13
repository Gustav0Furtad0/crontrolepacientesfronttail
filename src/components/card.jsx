export default function Card(props){

    let classes = 'bg-white shadow-lg rounded-lg p-4' + (props.className ? ' ' + props.className : '');
    return (
        <div className={classes}>
            {props.children}
        </div>
    );
}