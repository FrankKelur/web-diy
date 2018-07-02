import { lang } from 'common/js/Utils'
import configService from '../../layout/admin/service'
// import { fetch, lang } from 'common/js/Utils'
var xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1y4gm2x" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="apply_money_workflow" name="申请零花钱工作流" isExecutable="false">
    <bpmn:extensionElements>
      <camunda:executionListener event="start">
        <camunda:script scriptFormat="" resource="" />
      </camunda:executionListener>
    </bpmn:extensionElements>
    <bpmn:startEvent id="apply" name="申请零花钱" camunda:formKey="apply">
      <bpmn:extensionElements>
        <camunda:formData businessKey="deadline">
          <camunda:formField id="deadline" label="放款时间" type="date">
            <camunda:properties>
              <camunda:property id="placeholder" value="请选择" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
            </camunda:validation>
          </camunda:formField>
          <camunda:formField id="amount" label="金额" type="string">
            <camunda:properties>
              <camunda:property id="placeholder" value="请输入" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
              <camunda:constraint name="number" />
            </camunda:validation>
          </camunda:formField>
          <camunda:formField id="reason" label="理由" type="string">
            <camunda:properties>
              <camunda:property id="placeholder" value="请输入" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
            </camunda:validation>
          </camunda:formField>
        </camunda:formData>
      </bpmn:extensionElements>
      <bpmn:outgoing>SequenceFlow_1tcin0q</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="final_audit_gateway" name="终审前网关">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="result" />
          <camunda:outputParameter name="result" />
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_1j03z2d</bpmn:incoming>
      <bpmn:outgoing>primary_success</bpmn:outgoing>
      <bpmn:outgoing>primary_fail</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="primary_success" name="初审成功" sourceRef="final_audit_gateway" targetRef="Task_0gk5780" />
    <bpmn:sequenceFlow id="SequenceFlow_1tcin0q" sourceRef="apply" targetRef="apply_b_primary_audit" />
    <bpmn:endEvent id="EndEvent_001ozlz" name="失败">
      <bpmn:incoming>primary_fail</bpmn:incoming>
      <bpmn:incoming>final_audit_fail</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:endEvent id="EndEvent_0lmuymw" name="成功">
      <bpmn:incoming>audit_success</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="primary_fail" name="初审失败" sourceRef="final_audit_gateway" targetRef="EndEvent_001ozlz">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">result=='fail'</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:exclusiveGateway id="ExclusiveGateway_1ht41hy">
      <bpmn:incoming>SequenceFlow_0ti56pm</bpmn:incoming>
      <bpmn:outgoing>final_audit_fail</bpmn:outgoing>
      <bpmn:outgoing>audit_success</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="final_audit_fail" name="终审失败" sourceRef="ExclusiveGateway_1ht41hy" targetRef="EndEvent_001ozlz" />
    <bpmn:sequenceFlow id="audit_success" name="终审成功" sourceRef="ExclusiveGateway_1ht41hy" targetRef="EndEvent_0lmuymw" />
    <bpmn:task id="apply_b_primary_audit" name="申请handler">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="deadline" />
          <camunda:inputParameter name="amount" />
          <camunda:inputParameter name="reason" />
          <camunda:outputParameter name="result" />
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_1tcin0q</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0gcuvxm</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_1q4wv7d" name="初审 handler">
      <bpmn:incoming>SequenceFlow_0gcuvxm</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1owqkp1</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1j03z2d</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0gcuvxm" sourceRef="apply_b_primary_audit" targetRef="Task_1q4wv7d" />
    <bpmn:sequenceFlow id="SequenceFlow_1j03z2d" sourceRef="Task_1q4wv7d" targetRef="final_audit_gateway" />
    <bpmn:startEvent id="primay_audit" name="初审" camunda:formKey="primary_audit">
      <bpmn:extensionElements>
        <camunda:formData businessKey="remark">
          <camunda:formField id="result" label="结论" type="enum">
            <camunda:properties>
              <camunda:property id="placeholder" value="结论" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
            </camunda:validation>
            <camunda:value id="fail" name="失败" />
            <camunda:value id="success" name="成功" />
          </camunda:formField>
          <camunda:formField id="remark" label="备注" type="string">
            <camunda:properties>
              <camunda:property id="placeholder" value="备注" />
            </camunda:properties>
          </camunda:formField>
        </camunda:formData>
      </bpmn:extensionElements>
      <bpmn:outgoing>SequenceFlow_1owqkp1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1owqkp1" sourceRef="primay_audit" targetRef="Task_1q4wv7d" />
    <bpmn:startEvent id="final_audit" name="终审" camunda:formKey="final_audit">
      <bpmn:extensionElements>
        <camunda:formData businessKey="remark">
          <camunda:formField id="result" label="结论" type="enum">
            <camunda:properties>
              <camunda:property id="placeholder" value="请选择" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
            </camunda:validation>
            <camunda:value id="fail" name="失败" />
            <camunda:value id="success" name="成功" />
          </camunda:formField>
          <camunda:formField id="remark" label="备注" type="string">
            <camunda:properties>
              <camunda:property id="placeholder" value="请输入" />
            </camunda:properties>
            <camunda:validation>
              <camunda:constraint name="required" />
            </camunda:validation>
          </camunda:formField>
        </camunda:formData>
      </bpmn:extensionElements>
      <bpmn:outgoing>SequenceFlow_1fk2i40</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_0gk5780" name="终审 handler">
      <bpmn:incoming>primary_success</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1fk2i40</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0ti56pm</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0ti56pm" sourceRef="Task_0gk5780" targetRef="ExclusiveGateway_1ht41hy" />
    <bpmn:sequenceFlow id="SequenceFlow_1fk2i40" sourceRef="final_audit" targetRef="Task_0gk5780" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="apply_money_workflow">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="apply">
        <dc:Bounds x="211" y="170" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="202" y="213" width="55" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_1hvyell_di" bpmnElement="final_audit_gateway" isMarkerVisible="true">
        <dc:Bounds x="625" y="163" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="624" y="220" width="55" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1jxj1jc_di" bpmnElement="primary_success">
        <di:waypoint x="675" y="188" />
        <di:waypoint x="718" y="188" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="675" y="170" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1tcin0q_di" bpmnElement="SequenceFlow_1tcin0q">
        <di:waypoint x="247" y="188" />
        <di:waypoint x="287" y="188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_001ozlz_di" bpmnElement="EndEvent_001ozlz">
        <dc:Bounds x="880" y="313" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="887" y="356" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_0lmuymw_di" bpmnElement="EndEvent_0lmuymw">
        <dc:Bounds x="1030" y="170" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1037" y="213" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_09s58bp_di" bpmnElement="primary_fail">
        <di:waypoint x="650" y="213" />
        <di:waypoint x="650" y="331" />
        <di:waypoint x="880" y="331" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="646" y="269" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1ht41hy_di" bpmnElement="ExclusiveGateway_1ht41hy" isMarkerVisible="true">
        <dc:Bounds x="873" y="163" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0udaeko_di" bpmnElement="final_audit_fail">
        <di:waypoint x="898" y="213" />
        <di:waypoint x="898" y="313" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="891" y="260" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_04b1mbw_di" bpmnElement="audit_success">
        <di:waypoint x="923" y="188" />
        <di:waypoint x="1030" y="188" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="955" y="170" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_12pzjag_di" bpmnElement="apply_b_primary_audit">
        <dc:Bounds x="287" y="148" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1q4wv7d_di" bpmnElement="Task_1q4wv7d">
        <dc:Bounds x="451.25" y="148" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0gcuvxm_di" bpmnElement="SequenceFlow_0gcuvxm">
        <di:waypoint x="387" y="188" />
        <di:waypoint x="451" y="188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1j03z2d_di" bpmnElement="SequenceFlow_1j03z2d">
        <di:waypoint x="551" y="188" />
        <di:waypoint x="625" y="188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_0kklsv7_di" bpmnElement="primay_audit">
        <dc:Bounds x="483" y="44.5" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="491" y="21" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1owqkp1_di" bpmnElement="SequenceFlow_1owqkp1">
        <di:waypoint x="501" y="81" />
        <di:waypoint x="501" y="148" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_1fnxbf3_di" bpmnElement="final_audit">
        <dc:Bounds x="750.25" y="45" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="757" y="27" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0gk5780_di" bpmnElement="Task_0gk5780">
        <dc:Bounds x="718.25" y="148" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0ti56pm_di" bpmnElement="SequenceFlow_0ti56pm">
        <di:waypoint x="818" y="188" />
        <di:waypoint x="873" y="188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1fk2i40_di" bpmnElement="SequenceFlow_1fk2i40">
        <di:waypoint x="768" y="81" />
        <di:waypoint x="768" y="148" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
var defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="412" y="240" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`

export default {
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  getRenderData (params) {
    return configService.getConfig().then(({data: {text}}) => {
      return Object.assign(lang[params.page], text[params.page])
    })
  },
  add (params) {
    return Promise.resolve({re: 200})
  },
  save (params) {
    return Promise.resolve({re: 200})
  },
  getDefaultXMLSync () {
    return defaultXML
  },
  getWorkflowList (params) {
    return Promise.resolve([
      {
        name: '零用钱申请',
        xml: xml
      },
      {
        name: '工资预支',
        xml: xml
      }
    ])
  }
}
