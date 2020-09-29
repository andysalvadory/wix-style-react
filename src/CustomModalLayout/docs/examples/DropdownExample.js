/* eslint-disable */

class DropdownExample extends React.Component {
  render() {
    return (
      <CustomModalLayout
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => {}}
        title="Create New Coupon"
        subtitle="Make customers come back to your store with coupons"
        sideActions={<Checkbox>Checkbox</Checkbox>}
      >
        <Dropdown
          popoverProps={{ appendTo: 'window' }}
          options={[
            { id: 0, value: 'Option 1' },
            { id: 1, value: 'Option 2' },
            { id: 2, value: 'Option 3' },
            { id: 3, value: 'Option 4' },
          ]}
          placeholder="Select an option"
        />
      </CustomModalLayout>
    );
  }
}
