import { useRequest } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { permissionListApi, roleListApi, updateRoleApi } from '../../services'
import { Button, Drawer, message, Space, Table, Tree } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'

const treeData: TreeDataNode[] = []

const Role: React.FC = () => {

  const {data, error, loading, run} = useRequest(roleListApi)
  const {data: permissionData} = useRequest(permissionListApi)

  const [open, setOpen] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const [checked, setChecked] = useState({
    checked: [],
    halfChecked: []
  })

  const showTree = (row) => {
    setOpen(true)
    setEditRow(row)
    const obj = {
      checked: [],
      halfChecked: []
    }
    permissionData?.data.data.list.forEach(item => {
      // 查找当前行的权限
      const cur = row.permission.includes(item._id)
      if (cur) {
        // 判断当前权限子级是否全部选中
        if (item.children.every(v => row.permission.includes(v._id))) {
          obj.checked.push(item._id, ...item.children.map(v => v._id))
        } else {
          obj.halfChecked.push(item._id)
          obj.checked.push(...item.children.filter(v => row.permission.includes(v._id)).map(v => v._id))
        }
      }
    })
    setChecked(obj)
  }

  const onClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: 'isBtn',
      key: 'isBtn',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showTree(record)}>分配权限</Button>
        </Space>
      )
    },
  ]

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    setChecked({
      checked: checkedKeys,
      halfChecked: info.halfCheckedKeys
    })
  }

  useEffect(() => {
    if (!open) {
      setEditRow(null)
    }
  }, [open])

  const submit = async () => {
    const res = await updateRoleApi({
      id: editRow._id,
      permission: [...checked.checked, ...checked.halfChecked]
    })
    if (res.data.code === 200) {
      message.success('修改成功')
      onClose()
      run()
    } else {
      message.error(res.data.msg)
    }
  }

  return (
    <div>
      <Table
        rowKey='_id'
        columns={columns}
        dataSource={data?.data.data.list}
      />
      <Drawer
        title="分配角色"
        width={600}
        onClose={onClose}
        open={open}
        destroyOnClose
        footer={(
          <Button type="primary" onClick={submit}>确定</Button>
        )}
      >
        <Tree
          checkable
          checkedKeys={checked}
          defaultExpandedKeys={editRow?.permission}
          onCheck={onCheck}
          treeData={permissionData?.data.data.list || []}
          fieldNames={{title: 'name', key: '_id'}}
          titleRender={nodeData => {
            return nodeData.name + '' + nodeData._id
          }}
        />
      </Drawer>
    </div>
  )
}

export default Role
