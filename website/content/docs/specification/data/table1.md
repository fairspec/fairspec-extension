---
title: Table1
---

<h2>Primary Key</h2>
<p>
  <code>id</code>
</p>
<h2>Columns</h2>
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
            pattern:
            <code>^t1-[0-9]{3}$</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="name">
        <code>
          <strong>name</strong>
        </code>
      </td>
      <td>
        <p>Name of the entity</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            minLength:
            <code>3</code>
          </li>
          <li>
            maxLength:
            <code>100</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="status">
        <code>
          <strong>status</strong>
        </code>
      </td>
      <td>
        <p>Current status of the entity</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            enum:
            <code>active, inactive, pending</code>
          </li>
        </ul>
        <strong>Categories</strong>
        <ul>
          <li>
            <code>active</code>
          </li>
          <li>
            <code>inactive</code>
          </li>
          <li>
            <code>pending</code>
          </li>
        </ul>
      </td>
      <td>
        <code>categorical</code>
      </td>
    </tr>
    <tr>
      <td id="value">
        <code>
          <strong>value</strong>
        </code>
      </td>
      <td>
        <p>Numeric value associated with the entity</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            minimum:
            <code>0</code>
          </li>
        </ul>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td id="itemcount">
        <code>
          <strong>itemCount?</strong>
        </code>
      </td>
      <td>
        <p>Count of items</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            minimum:
            <code>0</code>
          </li>
          <li>
            maximum:
            <code>1000</code>
          </li>
        </ul>
      </td>
      <td>
        <code>integer</code>
      </td>
    </tr>
    <tr>
      <td id="isverified">
        <code>
          <strong>isVerified</strong>
        </code>
      </td>
      <td>
        <p>Whether the entity has been verified</p>
      </td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
    <tr>
      <td id="createddate">
        <code>
          <strong>createdDate</strong>
        </code>
      </td>
      <td>
        <p>Date when the entity was created</p>
      </td>
      <td>
        <code>date</code>
      </td>
    </tr>
    <tr>
      <td id="description">
        <code>
          <strong>description?</strong>
        </code>
      </td>
      <td>
        <p>Optional description of the entity</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
  </tbody>
</table>