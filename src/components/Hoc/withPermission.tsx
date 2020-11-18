/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import _ from 'lodash';
import { Platform } from 'react-native';
import RNPermissions, {
  NotificationsResponse,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  IOSPermission,
  AndroidPermission,
} from 'react-native-permissions';
import Helper from '@utils/helper';
import i18next from 'i18next';
import { IHocPermission } from '@utils/hocHelper';
import ModalButton from '../Common/Button/ModalButton';

export interface WithPermissionProps {
}

const withPermission = (
  permissions: IHocPermission[]
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const PERMISSIONS_VALUES: Permission[] = Helper.selectFields(permissions, Platform.OS);

  class WithPermission extends React.Component<P & WithPermissionProps, any> {
    requestPermission = async (index: number = 0) => {
      const permission = PERMISSIONS_VALUES[index];
      if (permission) {
        const thisAny: any = this;
        const status = await RNPermissions.check(permission);

        switch (status) {
          case 'denied':
            try {
              const request = await RNPermissions.request(permission);
              if (request === 'blocked') {
                thisAny[`permission${index}`].open();
              }
              return false;
            } catch (error) {
              return false;
            }
          case 'blocked':
            thisAny[`permission${index}`].open();
            return false;
          case 'granted':
            return true;
          default:
            return false;
        }
      }
      return null;
    };

    renderModalButton = () => permissions.map((permission: IHocPermission, index: number) => {
      const thisAny: any = this;
      return (
        <ModalButton
          key={index.toString()}
          ref={(ref: any) => { thisAny[`permission${index}`] = ref; }}
          modalProps={{
            title: permission.deniedMessage,
            okTitle: i18next.t('permission_denied:go_to_setting'),
            type: 'confirmation',
            onOkButtonPress: () => RNPermissions.openSettings()
          }}
          invisible
        />
      );
    });

    render() {
      return (
        <>
          <WrappedComponent
            {...this.props as P}
            {...this.state}
            requestPermission={this.requestPermission}
          />
          {this.renderModalButton()}
        </>
      );
    }
  }
  return WithPermission;
};
export default withPermission;