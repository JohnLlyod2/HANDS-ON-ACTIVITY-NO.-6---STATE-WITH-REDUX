<mxfile host="app.diagrams.net" modified="2025-02-12T12:00:00.000Z" agent="ChatGPT ERD Generator" version="20.0.4">
  <diagram id="ERD" name="Event Evaluation ERD">
    <mxGraphModel dx="1356" dy="768" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ROLE -->
        <mxCell id="role" value="ROLE&#xa;-------------&#xa;RoleID (PK)&#xa;RoleName" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="200" height="140" as="geometry"/>
        </mxCell>

        <!-- DEPARTMENT -->
        <mxCell id="department" value="DEPARTMENT&#xa;----------------------&#xa;DepartmentID (PK)&#xa;DepartmentName" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="300" y="40" width="220" height="140" as="geometry"/>
        </mxCell>

        <!-- USER -->
        <mxCell id="user" value="USER&#xa;-----------&#xa;UserID (PK)&#xa;FirstName&#xa;LastName&#xa;Email&#xa;PasswordHash&#xa;RoleID (FK)&#xa;DepartmentID (FK)" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="160" y="240" width="240" height="260" as="geometry"/>
        </mxCell>

        <!-- EVENT -->
        <mxCell id="event" value="EVENT&#xa;-------------&#xa;EventID (PK)&#xa;Title&#xa;Description&#xa;Date&#xa;Time&#xa;Venue&#xa;CreatedBy (FK)&#xa;CertificateTemplate" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="500" y="240" width="260" height="300" as="geometry"/>
        </mxCell>

        <!-- ATTENDANCE -->
        <mxCell id="attendance" value="ATTENDANCE&#xa;-------------------&#xa;AttendanceID (PK)&#xa;UserID (FK)&#xa;EventID (FK)&#xa;TimeIn&#xa;Method" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="40" y="560" width="230" height="220" as="geometry"/>
        </mxCell>

        <!-- EVALUATION -->
        <mxCell id="evaluation" value="EVALUATION&#xa;-------------------&#xa;EvaluationID (PK)&#xa;UserID (FK)&#xa;EventID (FK)&#xa;Rating&#xa;Comments&#xa;DateSubmitted" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="330" y="560" width="250" height="260" as="geometry"/>
        </mxCell>

        <!-- CERTIFICATE -->
        <mxCell id="certificate" value="CERTIFICATE&#xa;------------------&#xa;CertificateID (PK)&#xa;UserID (FK)&#xa;EventID (FK)&#xa;FilePath&#xa;QRCodeValue&#xa;DateIssued" style="swimlane;fontStyle=1;align=left;" vertex="1" parent="1">
          <mxGeometry x="650" y="560" width="250" height="260" as="geometry"/>
        </mxCell>

        <!-- RELATIONSHIPS WITH CARDINALITIES -->

        <!-- ROLE 1..* — USER -->
        <mxCell id="rel_role_user" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;endArrow=ERone;startArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_role_user_conn" source="role" target="user" parent="rel_role_user"/>

        <!-- DEPARTMENT 1..* — USER -->
        <mxCell id="rel_dept_user" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;endArrow=ERone;startArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_dept_user_conn" source="department" target="user" parent="rel_dept_user"/>

        <!-- USER 1..* — EVENT -->
        <mxCell id="rel_user_event" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;startArrow=ERone;endArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_user_event_conn" source="user" target="event" parent="rel_user_event"/>

        <!-- USER 1..* — ATTENDANCE -->
        <mxCell id="rel_user_att" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;startArrow=ERmany;endArrow=ERone">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_user_att_conn" source="user" target="attendance" parent="rel_user_att"/>

        <!-- EVENT 1..* — ATTENDANCE -->
        <mxCell id="rel_event_att" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;endArrow=ERmany;startArrow=ERone">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_event_att_conn" source="event" target="attendance" parent="rel_event_att"/>

        <!-- USER 1..* — EVALUATION -->
        <mxCell id="rel_user_eval" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;endArrow=ERmany;startArrow=ERone">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_user_eval_conn" source="user" target="evaluation" parent="rel_user_eval"/>

        <!-- EVENT 1..* — EVALUATION -->
        <mxCell id="rel_event_eval" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;startArrow=ERone;endArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_event_eval_conn" source="event" target="evaluation" parent="rel_event_eval"/>

        <!-- USER 1..* — CERTIFICATE -->
        <mxCell id="rel_user_cert" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;startArrow=ERone;endArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_user_cert_conn" source="user" target="certificate" parent="rel_user_cert"/>

        <!-- EVENT 1..* — CERTIFICATE -->
        <mxCell id="rel_event_cert" edge="1" value="1..* / 1..1" style="edgeStyle=entityRelationEdgeStyle;startArrow=ERone;endArrow=ERmany">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="rel_event_cert_conn" source="event" target="certificate" parent="rel_event_cert"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
