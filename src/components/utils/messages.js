import messages from '../../mgr/push/messages';
import { getClientID } from './uid';

export default messages({ user: getClientID() });
