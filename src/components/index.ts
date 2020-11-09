/* eslint-disable import/prefer-default-export */

/**
 * Common
 */
import StatusBar from './Common/StatusBar';
import QuickView from './Common/View/QuickView';
import Container from './Common/View/Container';
import Body from './Common/View/Body';
import Text from './Common/Text';
import Icon from './Common/Icon';
import Header from './Common/Header';
import Button from './Common/Button/DefaultButton';
import ModalButton from './Common/Button/ModalButton';
import ImagePickerButton from './Common/Button/ImagePickerButton';
import ButtonGroup from './Common/Button/ButtonGroup';
import Avatar from './Common/Avatar';
import Picker from './Common/Picker';
import DateTimePicker from './Common/DateTimePicker';
import ListCheckBox from './Common/ListCheckBox';
import Input from './Common/Input';
import FlatList from './Common/FlatList/DefaultFlatList';
import Image from './Common/Image/DefaultImage';
import Dropdown from './Common/Dropdown';
import ParallaxScrollView from './Common/ScrollView/ParallaxScrollView';
import HTML from './Common/HTML';
import Video from './Common/Video';
import Chat from './Common/Chat';
import FileViewButton from './Common/Button/FileViewButton';
import FilePickerButton from './Common/Button/FilePickerButton';
import Loading from './Common/Loading';
import MapView from './Common/MapView';

/**
 * Custom
 */
import TextError from './Custom/Text/TextError';
import PrimaryHeader from './Custom/Header/PrimaryHeader';
import GoToExampleButton from './Custom/Button/GoToExampleButton';
import AuthButton from './Custom/Button/AuthButton';
import PrimaryInput from './Custom/Input/PrimaryInput';
import BackIcon from './Custom/Icon/BackIcon';
import NavigatorButtonGroup from './Custom/Button/NavigatorButtonGroup';
import EditableImage from './Common/Image/EditableImage';
import withPureList from './Hoc/withPureList';

export {
  /**
   * Common
   */
  StatusBar,
  QuickView,
  Container,
  Body,
  Text,
  Icon,
  Header,
  Button,
  ImagePickerButton,
  ModalButton,
  ButtonGroup,
  Avatar,
  Picker,
  DateTimePicker,
  Input,
  ListCheckBox,
  FlatList,
  Image,
  EditableImage,
  Dropdown,
  ParallaxScrollView,
  HTML,
  Video,
  Chat,
  FileViewButton,
  FilePickerButton,
  Loading,
  MapView,

  /**
   * Custom
   */
  TextError,
  PrimaryHeader,
  GoToExampleButton,
  AuthButton,
  PrimaryInput,
  BackIcon,
  NavigatorButtonGroup,

  /**
   *  HOC
   */
  withPureList
};
