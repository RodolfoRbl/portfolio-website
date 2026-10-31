from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

OUT = "dist/Rodolfo_Robles_Resume.pdf"
NAVY = colors.HexColor("#1b2741")
BLUE = colors.HexColor("#4b5d99")
MUTED = colors.HexColor("#435069")
PALE = colors.HexColor("#c8cede")

doc = SimpleDocTemplate(OUT, pagesize=letter, rightMargin=.66*inch, leftMargin=.66*inch,
                        topMargin=.55*inch, bottomMargin=.55*inch,
                        title="Rodolfo Robles - Resume", author="Rodolfo Robles")
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=24,
                          leading=27, textColor=NAVY, alignment=TA_LEFT, spaceAfter=3))
styles.add(ParagraphStyle(name="Role", fontName="Helvetica-Bold", fontSize=9, leading=12,
                          textColor=BLUE, spaceAfter=5))
styles.add(ParagraphStyle(name="Contact", fontName="Helvetica", fontSize=8, leading=11,
                          textColor=MUTED, spaceAfter=0))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=9, leading=12,
                          textColor=BLUE, spaceBefore=13, spaceAfter=5))
styles.add(ParagraphStyle(name="Job", fontName="Helvetica-Bold", fontSize=9, leading=12,
                          textColor=NAVY, spaceAfter=2))
styles.add(ParagraphStyle(name="Date", fontName="Helvetica", fontSize=7, leading=10,
                          textColor=BLUE, spaceAfter=2))
styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=8, leading=11,
                          textColor=MUTED, leftIndent=10, firstLineIndent=-7, bulletIndent=0, spaceAfter=2))
styles.add(ParagraphStyle(name="Skill", fontName="Helvetica", fontSize=8, leading=11,
                          textColor=MUTED, spaceAfter=3))
styles.add(ParagraphStyle(name="Edu", fontName="Helvetica", fontSize=8, leading=11,
                          textColor=MUTED, spaceAfter=4))

story = [
    Paragraph("Rodolfo Robles", styles["Name"]),
    Paragraph("DATA ENGINEER&nbsp;&nbsp; | &nbsp;&nbsp;AI CLOUD ENGINEER&nbsp;&nbsp; | &nbsp;&nbsp;APPLIED AI", styles["Role"]),
    Paragraph('<link href="mailto:rodolforoblesramos@gmail.com" color="#4059a7">rodolforoblesramos@gmail.com</link>'
              '&nbsp;&nbsp; | &nbsp;&nbsp;'
              '<link href="https://www.linkedin.com/in/robles-rodolfo" color="#4059a7">linkedin.com/in/robles-rodolfo</link>'
              '&nbsp;&nbsp; | &nbsp;&nbsp;Mexico City', styles["Contact"]),
    Spacer(1, 8), HRFlowable(width="100%", thickness=1.5, color=BLUE),
    Paragraph("PROFESSIONAL EXPERIENCE", styles["Section"]),
]

def role(title, company, date, bullets):
    parts = [Paragraph(f"{title} <font color='#55617a' face='Helvetica'>{company}</font>", styles["Job"]),
             Paragraph(date.upper(), styles["Date"])]
    parts.extend(Paragraph(f"- {item}", styles["Body"]) for item in bullets)
    parts.append(Spacer(1, 4))
    return KeepTogether(parts)

story += [
    role("AI Cloud Engineer", "- Ford Motor Company", "Feb 2025 - Present", [
        "Architected an LLM-based multi-agent warranty intelligence workflow, moving claims classification and root-cause analysis from a 24-hour batch cycle to seconds.",
        "Coordinated a Spark-based data platform supporting 40M daily claims across 100+ vehicle lines and four global regions, doubling forecast coverage.",
        "Applied profiling and parallel-compute strategies to reduce cloud spend by 80% while tripling prediction throughput; coordinated distributed engineering teams."]),
    role("Data Scientist Associate", "- BBVA", "Dec 2022 - Feb 2025", [
        "Applied genetic algorithms and linear programming to payroll-loan pricing, increasing monthly allocations by 42% to over $150M.",
        "Deployed credit default models contributing to 6% of annual product sales; co-developed reusable Python feature extraction, optimization, and ETL tooling.",
        "Supervised three data engineers automating production-ready models and pipelines."]),
    role("Senior Data Engineering Analyst", "- Citi", "Jul 2021 - Dec 2022", [
        "Reengineered 10+ data projects, reducing execution time by up to 35%; strengthened production data quality and automation across five or more departments."]),
    role("Reinsurance Executive", "- SUMMA Reinsurance Broker", "Dec 2020 - Jul 2021", [
        "Automated monthly premium and claims processing, reducing delivery time from days to hours; built interactive contract-monitoring dashboards."]),
    Paragraph("TECHNICAL SKILLS", styles["Section"]),
    Paragraph("<b>Cloud &amp; data:</b> GCP, BigQuery, Dataflow, Dataproc, Cloud Storage, Cloud Functions, Cloud Build, AWS, Lambda, API Gateway, S3, DynamoDB", styles["Skill"]),
    Paragraph("<b>Engineering:</b> Python, SQL, PySpark, Apache Beam, Airflow, Pandas, NumPy, ETL, distributed computing, dbt, Terraform, Git, GitHub Actions, CI/CD", styles["Skill"]),
    Paragraph("<b>AI &amp; analytics:</b> Machine learning, LLMs, NLP, neural networks, TensorFlow, Keras, Scikit-learn, genetic algorithms, linear programming, Looker, Power BI", styles["Skill"]),
    Paragraph("EDUCATION &amp; CERTIFICATION", styles["Section"]),
    Paragraph("<b>Bachelor's, Actuarial Science</b> - National Autonomous University of Mexico (UNAM), 2016-2020", styles["Edu"]),
    Paragraph("<b>Diploma, Investment Projects</b> - UNAM, 2021-2022", styles["Edu"]),
    Paragraph("<b>IBM Data Science Certification</b> | Spanish (native) | English (advanced, IELTS 7.5)", styles["Edu"]),
]

def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(PALE)
    canvas.setLineWidth(.5)
    canvas.line(.66*inch, .42*inch, 7.84*inch, .42*inch)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#68738a"))
    canvas.drawString(.66*inch, .27*inch, "RODOLFO ROBLES  -  PUBLIC RESUME")
    canvas.drawRightString(7.84*inch, .27*inch, f"{document.page}")
    canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
