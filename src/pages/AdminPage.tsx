import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { DeleteRequest, DeleteRequestUpdate } from '../types/TodoType';

function AdminPage() {
  //ts

  const { user } = useAuth();
  // 삭제 요청 DB  목록 관리
  const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([]);
  // 로딩창
  const [loading, setLoading] = useState(true);

  // 관리자 확인
  const isAdmin = user?.email === 'wltjs6668@naver.com';
  useEffect(() => {
    console.log(user?.id);
    console.log(user?.email);
    console.log(user);
  }, [user]);

  // 컴포넌트가 완료가 되었을때 , isAdmin 을 체크 후 실행
  useEffect(() => {
    if (isAdmin) {
      //회원 탈퇴 신청자 목록을 파악하기.
      loadDeleteMember();
    }
  }, [isAdmin]);

  // 탈퇴 신청자 목록 파악 데이터 요청
  const loadDeleteMember = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('account_deletion_requests')
        .select('*')
        .eq('status', 'pending')
        .order('requested_at', { ascending: false });

      if (error) {
        console.log(`삭제 목록 요청 에러 : ${error.message}`);
        return;
      }

      // 삭제 요청 목록을 보관
      setDeleteRequests(data || []);
    } catch (err) {
      console.log('삭제 요청 목록 오류', err);
    } finally {
      setLoading(false);
    }
  };
  // 탈퇴 승인
  const approveDelete = async (id: string, updateUser: DeleteRequestUpdate): Promise<void> => {
    try {
      const { error } = await supabase
        .from('account_deletion_requests')
        .update({ ...updateUser, status: 'approved' })
        .eq('id', id);
      if (error) {
        console.log(`탈퇴 업데이트 오류 ${error.message}`);
        return;
      }

      alert(`사용자${id}의 계정이 삭제가 승인 되었습니다.\n\n 관리자님 수동으로 삭제 하세요.`);
      // 목록 다시읽기
      loadDeleteMember();
    } catch (err) {
      console.log('탈퇴승인 오류', err);
    }
  };
  // 탈퇴 거절!
  const rejectDelete = async (id: string, updateUser: DeleteRequestUpdate): Promise<void> => {
    try {
      const { error } = await supabase
        .from('account_deletion_requests')
        .update({ ...updateUser, status: 'rejected' })
        .eq('id', id);

      if (error) {
        console.log(`탈퇴 업데이트 오류 ${error.message}`);
        return;
      }
      alert(`사용자${id}의 계정이 삭제가 거부 되었습니다.`);

      // 목록 다시읽기
      loadDeleteMember();
    } catch (err) {
      console.log('탈퇴거절 오류', err);
    }
  };

  // 1. 관리자 아이디 불일치라면
  if (!isAdmin) {
    return (
      <div>
        <h1>접근 권한이 없습니다.</h1>
        <p>관리자만이 이 페이지에 접근할 수 있습니다.</p>
      </div>
    );
  }
  // 2. 로딩중이라면
  if (loading) {
    return <div>로딩중...</div>;
  }

  //tsx
  return (
    <div>
      <h1>🎈 관리자 페이지</h1>
      <div>
        {deleteRequests.length === 0 ? (
          <p>대기 중인 삭제 유저가 없습니다..🎆</p>
        ) : (
          <div>
            {deleteRequests.map(item => (
              <div key={item.id}>
                <div>
                  <h3>사용자 : {item.user_email}</h3>
                  <span>대기 중</span>
                </div>
                <div>
                  <p>사용자 아이디 : {item.user_id}</p>
                  <p>요청 시간 : {item.requested_at}</p>
                  <p>사유: {item.reason}</p>
                </div>
                <div>
                  <button onClick={() => approveDelete(item.id, item)}>승인</button>
                  <button onClick={() => rejectDelete(item.id, item)}>거절</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;