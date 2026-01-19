---
title: Table2
---

<p>An exemplar schema demonstrating foreign key relationships and additional constraints</p>
<h2>Primary Key</h2>
<p>
  <code>id</code>
</p>
<h2>Foreign Keys</h2>
<table>
  <colgroup>
    <col width="40%"/>
    <col width="30%"/>
    <col width="30%"/>
  </colgroup>
  <thead>
    <tr>
      <th>Fields</th>
      <th>Reference Resource</th>
      <th>Reference Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>table1Id</code>
      </td>
      <td>
        <code>table1</code>
      </td>
      <td>
        <code>id</code>
      </td>
    </tr>
  </tbody>
</table>
<h2>Fields</h2>
<table>
  <colgroup>
    <col width="20%"/>
    <col width="65%"/>
    <col width="15%"/>
  </colgroup>
  <thead>
    <tr>
      <th>Name</th>
      <th>Definition</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="id">
        <code>
          <strong>id</strong>
        </code>
      </td>
      <td>
        <p>Unique identifier for the record</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
          <li>
            pattern:
            <code>^t2-[0-9]{3}$</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>t2-001</code>
          </li>
          <li>
            <code>t2-002</code>
          </li>
          <li>
            <code>t2-003</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="table1id">
        <code>
          <strong>table1Id?</strong>
        </code>
      </td>
      <td>
        <p>Reference to the parent table1 record. If not provided, the record is independent</p>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>t1-001</code>
          </li>
          <li>
            <code>t1-002</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="title">
        <code>
          <strong>title</strong>
        </code>
      </td>
      <td>
        <p>Title or name of the item</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
          <li>
            minLength:
            <code>1</code>
          </li>
          <li>
            maxLength:
            <code>200</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>First Item</code>
          </li>
          <li>
            <code>Second Item</code>
          </li>
          <li>
            <code>Sample Entry</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="amount">
        <code>
          <strong>amount</strong>
        </code>
      </td>
      <td>
        <p>Monetary or numeric amount</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
          <li>
            minimum:
            <code>0</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>99.99</code>
          </li>
          <li>
            <code>150.5</code>
          </li>
          <li>
            <code>2500</code>
          </li>
        </ul>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td id="priority">
        <code>
          <strong>priority</strong>
        </code>
      </td>
      <td>
        <p>Priority level of the item</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
          <li>
            enum:
            <code>low, medium, high</code>
          </li>
        </ul>
        <strong>Categories</strong>
        <ul>
          <li>
            <code>low</code>
          </li>
          <li>
            <code>medium</code>
          </li>
          <li>
            <code>high</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>low</code>
          </li>
          <li>
            <code>medium</code>
          </li>
          <li>
            <code>high</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="percentage">
        <code>
          <strong>percentage?</strong>
        </code>
      </td>
      <td>
        <p>Percentage value between 0 and 100</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            minimum:
            <code>0</code>
          </li>
          <li>
            maximum:
            <code>100</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>25.5</code>
          </li>
          <li>
            <code>50</code>
          </li>
          <li>
            <code>75.25</code>
          </li>
          <li>
            <code>100</code>
          </li>
        </ul>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td id="notes">
        <code>
          <strong>notes?</strong>
        </code>
      </td>
      <td>
        <p>Additional notes or comments</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            maxLength:
            <code>500</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>This is a note</code>
          </li>
          <li>
            <code>Additional information here</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="isactive">
        <code>
          <strong>isActive</strong>
        </code>
      </td>
      <td>
        <p>Whether the item is currently active</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            required:
            <code>true</code>
          </li>
        </ul>
        <strong>Examples</strong>
        <ul>
          <li>
            <code>true</code>
          </li>
          <li>
            <code>false</code>
          </li>
        </ul>
      </td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
  </tbody>
</table>