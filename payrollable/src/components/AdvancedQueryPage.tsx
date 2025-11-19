import { useNavigate } from "react-router";
import AccordionItem from "./AccordionItem";

export default function AdvancedQueryPage() {
    const navigate = useNavigate();

    return (
            <div className="col-md-12 p-4">
                <h1>Advanced Queries</h1>
                <div className="accordion" id="advancedQueries">
                    <AccordionItem id="11" title={"List Out Employees That Have Never Gotten a Bonus Before."}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/11')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="12" title="List Out Salaried Employees Who Earn More Than Their Department Average.">
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/12')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="13" title="List Departments With More Than 2 Employees and Total Gross Payments Over 10,000.">
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/13')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="4" title="List Employees Whose Total Bonuses Exceed Their Total Deductions.">
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/14')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="5" title="List Job Positions Where the Average Salary Is Greater Than the Company's Overall Average.">
                        <pre style={{ whiteSpace: "pre-wrap"}}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/15')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="6" title="List Employees Who Have Both Received a Bonus and Have Active Deductions.">
                        <pre style={{ whiteSpace: "pre-wrap"}}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/16')}>Run</button>
                    </AccordionItem>
    
                    <AccordionItem id="7" title="List Employees Who Had a Payroll Period Starting in September 2025 but Not October 2025.">
                        <pre style={{ whiteSpace: "pre-wrap"}}>
                            {``}
                        </pre>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/17')}>Run</button>
                    </AccordionItem>
                </div>
        </div>
    )
}