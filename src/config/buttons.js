export const actionsButtons = [
  {
    label: 'Delete',
    key: 'delete'
  },
  {
    label: 'View',
    key: 'view'
  },
  {
    label: 'Edit',
    key: 'edit'
  },
  {
    label: 'Mark as Inactive',
    key: 'markAsInactive'
  },
  {
    label: 'Mark as Approve',
    key: 'markAsApprove'
  }
];
export const userTypeButtons = {
  admin: [
    {
      type: 'button',
      className: 'pr-2 me-2',
      variant: 'light',
      label: 'Cancel',
      disable: false
    },
    {
      type: 'button',
      className: 'pr-2 me-2',
      variant: 'light',
      label: 'Create Draft',
      disable: false
    },
    {
      type: 'submit',
      className: 'pr-2',
      variant: 'primary',
      label: 'Submit for Approval',
      disable: false
    }
  ],
  superAdmin: [
    {
      type: 'button',
      className: 'pr-2 me-2',
      variant: 'light',
      label: 'Back',
      disable: false
    },
    {
      type: 'button',
      className: 'pr-2 me-2',
      variant: 'light',
      label: 'Reject',
      disable: false
    },
    {
      type: 'button',
      className: 'pr-2',
      variant: 'primary',
      label: 'Approve',
      disable: false
    }
  ]
};
