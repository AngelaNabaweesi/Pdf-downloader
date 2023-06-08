import { useState, useRef} from 'react';
import jsPDF from 'jspdf';
// import download from './images/download.jpeg';
function FormSetter(props){

    const firstNameRef = useRef(null);
    const secondNameRef = useRef(null);
    const phoneRef = useRef(null);

    function handleChange(e){
        props.setFormData({...props.formData, [e.target.name]: e.target.value})
    }

    function submitHandler(e){
        e.preventDefault()
        props.onDetail(props.formData);
        props.setFormData({firstName: 'John',
        secondName: 'Doe',
        phone: '+246576890'});
    }
    const pdfGenerate = (formData) => {
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.setFont('Helvertica', 'bold')

        doc.setFillColor(255, 0, 0);

        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F');

        doc.setTextColor(0, 0, 0);
        
        doc.setFontSize(25)
        doc.text('clinicPesa', doc.internal.pageSize.getWidth() / 2, 20, 
        { align: 'center'})

        doc.setFillColor(0,0,0)

        doc.setTextColor(0,0,0)

        doc.setFontSize(16)

        doc.setFont('Helvertica', 'Normal')

        doc.text(60, 60, 'First Name:')
        doc.text(60, 80, 'Second Name:')
        doc.text(60, 100, 'Phone Number:')
        doc.text(140, 60, firstNameRef.current.value)
        doc.text(140, 80, secondNameRef.current.value)
        doc.text(140, 100,  phoneRef.current.value)
        doc.save('download.pdf')
    }

    
    return(
        <>
            <h1>Send Us Your Feedback</h1>
            <div className="container">
                <div className="row">
                    <form onSubmit={submitHandler}>
                        <div className="col-sm mb-4 mt-4">
                            <label htmlFor="firstName" 
                                className="form-label">First Name: </label>
                            <input
                                ref={firstNameRef}
                                className="form-control" 
                                type="text" 
                                name="firstName" 
                                value={props.formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="col-sm mb-4 mt-4">
                            <label htmlFor="secondName"
                                className="form-label">Second Name: </label>
                            <input 
                                ref={secondNameRef}
                                className="form-control"
                                type="text"
                                name="secondName"
                                value={props.formData.secondName}
                                onChange={handleChange}
                                placeholder="Second Name"
                            />
                        </div>
                        <div className="col-sm mb-4 mt-4">
                            <label htmlFor="phone"
                                className="form-label">Phone Number: </label>
                            <input
                                ref={phoneRef}
                                className="form-control"
                                type="text"
                                name="phone"
                                value={props.formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                            />
                        </div>
                        <button className="btn btn-primary">Submit Details</button>
                        <button className="btn btn-success" onClick={pdfGenerate}>Generate PDF</button>
                    </form>                      
                </div>
            </div>          
        </>
    )
    
}   
function ListofDetails(props){

    return(
        <div >
            <ul>
                {props.allDetails.map((d)=>(
                    <li key={d.detail}>
                        <span>
                            First Name: {d.firstName}, 
                            Second Name: {d.secondName},
                            Phone Number: {d.phone}</span>
                    </li>
                ))}
            </ul>        
            
        </div>
    )
}

export default function Contact(){
    const [formData, setFormData] = useState({
        firstName: 'John',
        secondName: 'Doe',
        phone: '+246576890'
      });
    
    const [allDetails, updateAllDetails] = useState([]);    

    function addDetails(detail){
        updateAllDetails([...allDetails, detail])
    }   
    return(
        <>
            <FormSetter onDetail={addDetails} formData={formData} setFormData={setFormData}/>
            <ListofDetails allDetails={allDetails} formData={formData}/>
            
        </>

    )
}

